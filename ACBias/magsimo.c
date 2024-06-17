//
// magsimo.c - Naive simulation of the magnetic behaviour of recording tape,
//             and especially the AC bias recording process.
//
// This file tries to avoid all dependencies. That is why it writes raw binary
// image data which must be post-processed in to a standard format for use.
// See: raw2jpeg.py for a Python program which does that.
//
// On Windows (with Visual C++ installed and ready to use) compile and run with:
// cl magsimo.c
// magsimo
//
// On Linux:
// gcc magsimo.c -o magsimo -lm
// ./magsimo
// seems to work.
//
//  Copyright (C) 2012 Nick Glazzard
//  Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//

#include <stdio.h>
#include <math.h>
#include <malloc.h>
#ifdef __linux
#include <string.h>
#endif

typedef struct tagPARTICLE
{
  float x, y;     // Position
  float ox, oy;   // Orientation
  float c;        // Coercivity (or size, effectively)
  float m;        // Magnetization (+1 or -1)
  float hx, hy;   // Magnetic field at the particle position.
  float epos;     // External field to switch positive.
  float eneg;     // External field to switch negative.
  float saved_m;  // Saved magentization.
} PARTICLE;

typedef struct tagTAPE
{
  PARTICLE* particles;  // Particles that make up the tape.
  int nparticles;       // Number of particles.
  int nside;            // Number of particles per side.
} TAPE;

// Very simple, but decent, congruential PRNG due to George Marsaglia.
//--------------------------------------------------------------------
static unsigned long xseed=123456789;  // Change to change sequence.
unsigned long cong( void ) 
{ 
  xseed = 69069 * xseed + 362437;
  return( xseed & 0xffffffff );
}

float frand( float min, float max )
//---------------------------------
// Return a random float between min and max.
{
  float r01 = (float)cong() / 4294967295.0f;
  return( r01 * ( max - min ) + min );
}

float length2( float x, float y )
//-------------------------------
// Return the length squared of vector (x,y)
{
  return( x*x + y*y );
}

float v2norm( float x, float y, float* xo, float* yo )
//----------------------------------------------------
// Normalize a 2D vector.
{
  float len;
  len = length2( x, y );
  if( len > 1e-12 ){
    len = sqrtf( len );
    *xo = x / len;
    *yo = y / len;
    return( len );
  }
  else{
    *xo = x;
    *yo = y;
    return( 0.0f );
  }
}

float distance2( float x1, float y1, float x2, float y2 )
//------------------------------------------------------
// Return distance squared between positions (x1,y1) and (x2,y2).
{
  float dx, dy;
  dx = x2 - x1;
  dy = y2 - y1;
  return( length2( dx, dy ) );
}

float distance( float x1, float y1, float x2, float y2 )
//------------------------------------------------------
// Return distance between positions (x1,y1) and (x2,y2).
{
  return( sqrtf( distance2( x1, y1, x2, y2 ) ) );
}

float dot( float x1, float y1, float x2, float y2 )
//-------------------------------------------------
// Return the dot product of (x1,y1) and (x2,y2).
{
  return( x1 * x2 + y1 * y2 );
}

int make_tape( TAPE* tape, int nside )
//------------------------------------
// Arrange a grid of nside * nside particles with a given orientation distribution
// and size distribution. Give each particle a random magnetic polarity (-1 or +1
// corresponding to N-S or S-N). This corresponds to the erased state of the tape
// with zero net magnetization.
{
  int x, y, i;
  float angle, w, s;
  PARTICLE* cp;

  // Find how many particles to generate and make space for them.
  tape->nside = nside;
  tape->nparticles = nside * nside;
  tape->particles = (PARTICLE*)malloc( tape->nparticles * sizeof(PARTICLE) );
  if( tape->particles == NULL )
    return( 0 );
  
  // Hand tuned to give nice ranges of things.
  // There is no justification for using these values!
  w = 6.0f;//5.0f; //10.0f; //7.0f;
  s = 0.2f;//0.45f;

  // Generate each particle in turn.
  for( y=0; y<nside; y++ ){
    for( x=0; x<nside; x++ ){
      i = y * nside + x;
      cp = &tape->particles[i];
      
      // Set position by jittering a regular grid.
      cp->x = w * x + frand( -s * w, s * w );
      cp->y = w * y + frand( -s * w, s * w );

      // Set orientation vector in a +/- 30 degree angle wrt X axis.
      angle = frand( -30.0f, 30.0f ) * 0.017453293f;
      cp->ox = cosf( angle );
      cp->oy = sinf( angle );

      // Set size.
      cp->c = frand( 0.2f, 0.8f );

      // Set initial magnetization polarity.
      if( frand( -1.0f, 1.0f ) < 0.0f )
	cp->m = -1.0f;
      else
	cp->m = 1.0f;

      // We don't have the internal field vector at the particle yet.
      cp->hx = 0.0f;
      cp->hy = 0.0f;

      // We don't know the switching fields for this particle either.
      cp->epos = 0.0f;
      cp->eneg = 0.0f;
    }
  }
  return( 1 );
}

void find_ambient_field( TAPE* tape, float e )
//--------------------------------------------
// Find the magnetic field vector at every particle position due to
// all the other particles.
{
  int i, j;
  float r2, hx, hy;
  PARTICLE *cpi, *cpj;

  // For each particle, i ...
  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];

    // Find the field due to all the other particles, j, at its position ...
    hx = e;
    hy = 0.0f;
    for( j=0; j<tape->nparticles; j++ ){
      cpj = &tape->particles[j];
      if( i != j ){
	r2 = distance2( cpi->x, cpi->y, cpj->x, cpj->y );
	hx += ( cpj->ox * cpj->c * cpj->m ) / r2;
	hy += ( cpj->oy * cpj->c * cpj->m ) / r2;
      }
    }
    cpi->hx = hx;
    cpi->hy = hy;
  }
}

int flip_polarity_ambient( TAPE* tape )
//-------------------------------------
// If the field due to other particles exceeds that due to the
// particle itself, and is in the opposite direction, flip the 
// polarity of the particle. Return the number of flips done.
// ** NOT ACTUALLY USED **
{
  int i, nflips;
  float mx, my, hproj, mx_n, my_n, hx_n, hy_n, lm, lh;
  PARTICLE *cpi;

  // No flips yet. Step over all the particles.
  nflips = 0;
  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];

    // Find the magnetic field of the current particle.
    mx = cpi->ox * cpi->c * cpi->m;
    my = cpi->oy * cpi->c * cpi->m;

    lm = v2norm( mx, my, &mx_n, &my_n );
    lh = v2norm( cpi->hx, cpi->hy, &hx_n, &hy_n );

    // If the magnetic field, h, is pointing in the opposite direction
    // to the current particle's magnetic field ...
    hproj = dot( mx_n, my_n, hx_n, hy_n );
    if( hproj < 0.0f ){
      
      // If the magnitude of h is greater than the magnitude of the
      // particle's magnetic field, flip the polarity of the particle's
      // field.
      if( lh > lm ){
	cpi->m = -cpi->m;
	nflips++;
      }
    }
  }
  
  return( nflips );
}

int solve_state( TAPE* tape, float e, int maxiter )
//-------------------------------------------------
// Find the equilibrium state for an external field e.
// Return the number of iterations required.
// ** NOT ACTUALLY USED **
{
  int iter, nflips;

  for( iter=0; iter<maxiter; iter++ ){
    find_ambient_field( tape, e );
    nflips = flip_polarity_ambient( tape );
    printf( "Iter: %d, Flips: %d\n", iter, nflips );
    if( nflips == 0 )
      break;
  }
  return( iter );
}

float measure_magnetisation( TAPE* tape )
//---------------------------------------
// Find a measure of the magnetization in the X direction.
// Just sum up the X components of the particles magnetization.
{
  int i;
  PARTICLE *cpi;
  float mag = 0.0f;
  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    mag += cpi->ox * cpi->c * cpi->m;
    //printf( "%f %f %f\n", cpi->ox, cpi->c, cpi->m );
  }
  return( mag / tape->nparticles );
}

int plot_magnetisation( TAPE* tape, char* file, int what )
//--------------------------------------------------------
// Plot a magnetic field:
// what: 1 = ambient fiend X component
//       2 = positive switching threshold
//       3 = negative switching threshold
{
  int x, y, i;
  PARTICLE *cp;
  FILE* fout;

  fout = fopen( file, "w+" );
  if( fout == NULL )
    return( 0 );

  for( y=0; y<tape->nside; y++ ){
    for( x=0; x<tape->nside; x++ ){
      i = y * tape->nside + x;
      cp = &tape->particles[i];

      switch( what ){
      case 1:
      default:
	fprintf( fout, "%d %d %f\n", x, y, cp->hx );
	break;
      case 2:
	fprintf( fout, "%d %d %f\n", x, y, cp->epos );
	break;
      case 3:
	fprintf( fout, "%d %d %f\n", x, y, cp->eneg );
	break;
      }
    }
    fprintf( fout, "\n" );
  }
  fprintf( fout, "e\n" );
  fclose( fout );
  return( 1 );
}

int find_switching_fields( TAPE* tape )
//-------------------------------------
// Find the external field X component for each particle that will switch it
// to -ve polarity and likewise to +ve polarity. 
// The -ve threshold WILL NOT EQUAL the +ve threshold due to the ambient field.
{
  int i;
  PARTICLE *cpi;

  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    cpi->epos = cpi->c / cpi->ox + cpi->hx;
    cpi->eneg = -cpi->c / cpi->ox + cpi->hx;
  }
  return( 1 );
}

int plot_switching_fields( TAPE* tape, char* file )
//-------------------------------------------------
// Plot the -ve switching field against the +ve switching
// field. This is often called a Preisach diagram.
{
  int i;
  PARTICLE *cpi;
  FILE* fout;

  fout = fopen( file, "w+" );
  if( fout == NULL )
    return( 0 );

  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    fprintf( fout, "%f %f\n", cpi->epos, -cpi->eneg );
  }

  fclose( fout );
  return( 1 );
}

int switch_polarities( TAPE* tape, float e )
//------------------------------------------
// For a given external field X component, e, set
// the magnetic polarities of each particle using the switching
// threshold fields for the particle. Save the previous
// polarity before doing so.
{
  int i, nflips;
  PARTICLE *cpi;

  nflips = 0;
  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    cpi->saved_m = cpi->m;
    if( e > cpi->epos ){
      cpi->m = 1.0f;
      nflips++;
    }
    else if ( e < cpi->eneg ){
      cpi->m = -1.0f;
      nflips++;
    }
  }
  return( nflips );
}

void reset_polarities( TAPE* tape )
//---------------------------------
// Restore the particle polarities saved by
// switch_polarities().
{
  int i, nflips;
  PARTICLE *cpi;

  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    cpi->m = cpi->saved_m;
  }
}

void ac_bias_process( TAPE* tape, float s, int n )
//------------------------------------------------
// Simulate the AC bias recording process for a given constant
// signal field X component, s. The (bias+signal) fields
// decay over n cycles.
{
  int i;
  float decay, bias, e;

  // Bias + signal decay to zero.
  for( i=n; i>=0; i-- ){
    decay = (float)i /  n;
    bias = ( i & 1 ) ? 1.0f : -1.0f;
    e = decay * ( bias + s );
    // printf( "i=%d, decay=%f, bias=%f, e=%f\n", i, decay, bias, e );
    switch_polarities( tape, e );
  }
}

int* j_function( TAPE* tape, int dim )
//------------------------------------
// Find the density of particles per unit area
// in +ve vs. -ve switching fields plane.
{
  int* func;
  int i, x, y;
  PARTICLE *cpi;
  float scale;

  func = (int*)malloc( dim * dim * sizeof(int) );
  if( func == NULL )
    return( NULL );

  memset( func, 0, dim * dim * sizeof(int) );

  scale = dim;

  for( i=0; i<tape->nparticles; i++ ){
    cpi = &tape->particles[i];
    x = (int)( scale * cpi->epos );
    y = (int)( scale * -cpi->eneg );
    if( x >= 0 && x < dim && y >= 0 && y < dim ){
      func[x+y*dim] += 1;
    }
  }

  return( func );
}

int plot_j_function( TAPE* tape, int dim, char* file )
//----------------------------------------------------
// Plot the particle density function.
{
  int x, y, i;
  PARTICLE *cp;
  FILE* fout;
  int* jfunc;
  float xyscale, zscale;

  xyscale = 1.0f / dim;

  jfunc = j_function( tape, dim );
  if( jfunc != NULL ){

    fout = fopen( file, "w+" );
    if( fout == NULL ){
      free( jfunc );
      return( 0 );
    }

    // Work out a scale factor to move the maximum density to 1.0
    zscale = 0.0f;
    for( y=0; y<dim; y++ ){
      for( x=0; x<dim; x++ ){
	i = y * dim + x;
	if( jfunc[i] > zscale )
	  zscale = jfunc[i];
      }
    }
    zscale = 1.0f / zscale;

    // Plot.
    for( y=0; y<dim; y++ ){
      for( x=0; x<dim; x++ ){
	i = y * dim + x;
	fprintf( fout, "%f %f %f\n", xyscale*x, xyscale*y, zscale*jfunc[i] );
      }
    }
    fprintf( fout, "\n" );

    fprintf( fout, "e\n" );
    fclose( fout );

    free( jfunc );
    return( 1 );
  }
  else
    return( 0 );
}

int writerawbytes( char* name, char* redbytes, char* greenbytes, char* bluebytes, int w, int h )
//----------------------------------------------------------------------------------------------
// Write an RGB image (plane order) as bytes with no adornments.
{
  FILE* fout = fopen( name, "wb+" );
  if( fout == NULL )
    return( 0 );
  fwrite( redbytes, 1, w*h, fout );
  fwrite( greenbytes, 1, w*h, fout );
  fwrite( bluebytes, 1, w*h, fout );
  fclose( fout );
  printf( "Wrote raw byte image to: %s\r", name );
  return( 1 );
}

int ac_bias_animation( TAPE* tape, float e, char* fname )
//-------------------------------------------------------
// Generate a sequence of RGB images (raw bytes) illustrating the AC bias recording
// process in action on the switching fields plane.
{
  int* jfunc;
  int* set;
  char outname[256];
  int frame, cycles, numcycles, numframes_per_halfcycle, imult, wj, w, h, i, j, x, y, pi, pj, outframe, total_frames;
  float biasphase, amp, decay, f;
  char *redbytes, *greenbytes, *bluebytes;

  wj = 100;
  imult = 4;
  w = h = imult * wj;
  redbytes = (char*)malloc( w * h );
  greenbytes = (char*)malloc( w * h );
  bluebytes = (char*)malloc( w * h );
  set = (int*)malloc( wj * wj * sizeof(int) );
  if( ! redbytes || ! greenbytes || ! bluebytes || ! set )
    return( 0 );

  memset( redbytes, 0, w*h );
  memset( greenbytes, 0, w*h );
  memset( bluebytes, 0, w*h );
  memset( set, 0, wj*wj*sizeof(int) );

  jfunc = j_function( tape, 100 );
  if( jfunc == NULL )
    return( 0 );

  numcycles = 20;
  numframes_per_halfcycle = 10;
  outframe = 1;
  total_frames = numcycles * numframes_per_halfcycle * 2;
  for( cycles=0; cycles<numcycles; cycles++ ){

    // Positive half cycle
    for( frame=0; frame<numframes_per_halfcycle; frame++ ){
      decay = 1.0f - ( (float)(outframe-1) / ( total_frames - 1 ) );
      biasphase = (float)frame / numframes_per_halfcycle * 3.14159f;
      amp = decay * ( sinf( biasphase ) + e );
      if( amp > 1.0f )amp = 1.0f;
      for( j=0; j<h; j++ ){
	y = j / imult;
	for( i=0; i<w; i++ ){
	  x = i / imult;
	  pj = x + y * wj;
	  pi = i + j * w;
	  f = 255.0f / 35.0f * jfunc[pj];
	  if( f > 255.0f )f = 255.0f;
	  if( set[pj] < 0 ){
	    redbytes[pi] = greenbytes[pi] = (char)(0.2f*f);
	    bluebytes[pi] = (char)f;
	  }
	  else if( set[pj] > 0 ){
	    redbytes[pi] = (char)f;
	    greenbytes[pi] = bluebytes[pi] = 0;
	  }
	  else
	    redbytes[pi] = greenbytes[pi] = bluebytes[pi] = (char)f;
	}
	for( i=0; i<(int)(w*amp); i++ ){
	  x = i / imult;
	  pj = x + y * wj;
	  pi = i + j * w;
	  redbytes[pi] = 255;
	  greenbytes[pi] = 50;
	  bluebytes[pi] = 50;
	  set[pj] = 1;
	}
      }
      sprintf( outname, "%s.%4.4d.raw", fname, outframe );
      writerawbytes( outname, redbytes, greenbytes, bluebytes, w, h );
      outframe++;
    } // frame

    // Negative half cycle
    for( frame=0; frame<numframes_per_halfcycle; frame++ ){
      decay = 1.0f - ( (float)(outframe-1) / ( total_frames - 1 ) );
      biasphase = (float)frame / numframes_per_halfcycle * 3.14159f;
      amp = decay * ( sinf( biasphase ) - e );
      if( amp > 1.0f )amp = 1.0f;
      for( j=0; j<h; j++ ){
	y = j / imult;
	for( i=0; i<w; i++ ){
	  x = i / imult;
	  pj = x + y * wj;
	  pi = i + j * w;
	  f = 255.0f / 35.0f * jfunc[pj];
	  if( f > 255.0f )f = 255.0f;
	  if( set[pj] < 0 ){
	    redbytes[pi] = greenbytes[pi] = (char)(0.2f*f);
	    bluebytes[pi] = (char)f;
	  }
	  else if( set[pj] > 0 ){
	    redbytes[pi] = (char)f;
	    greenbytes[pi] = bluebytes[pi] = 0;
	  }
	  else
	    redbytes[pi] = greenbytes[pi] = bluebytes[pi] = (char)f;
	}
	if( j < (int)(h*amp) ){
	  for( i=0; i<w; i++ ){
	    x = i / imult;
	    pj = x + y * wj;
	    pi = i + j * w;
	    redbytes[pi] = 50;
	    greenbytes[pi] = 50;
	    bluebytes[pi] = 255;
	    set[pj] = -1;
	  }
	}
      } // j
      sprintf( outname, "%s.%4.4d.raw", fname, outframe );
      writerawbytes( outname, redbytes, greenbytes, bluebytes, w, h );
      outframe++;
    } // frame
  } // cycle

  free( jfunc );
  return( 1 );
}

int plot_anhysteretic_b_h_curve( TAPE* tape, char* name )
//-------------------------------------------------------
// Anhysteretic B-H curve.
{
  float e, mag;
  FILE* fout;

  fout = fopen( name, "w+" );
  if( fout == NULL )
    return( 0 );

  for( e=(-1.0f); e<1.0f; e+=0.01f ){
    switch_polarities( tape, e );
    mag = measure_magnetisation( tape );
    fprintf( fout, "%f %f\n", e, mag );
    reset_polarities( tape );
  }

  fclose( fout );
  return( 1 );
}

int plot_ac_bias_curve( TAPE* tape, char* name )
//----------------------------------------------
// AC-bias B-H curve.
{
  float e, mag;
  FILE* fout;

  fout = fopen( name, "w+" );
  if( fout == NULL )
    return( 0 );

  for( e=(-1.0f); e<1.0f; e+=0.01f ){
    ac_bias_process( tape, e, 100 );
    mag = measure_magnetisation( tape );
    fprintf( fout, "%f %f\n", e, mag );
    reset_polarities( tape );
  }

  fclose( fout );
  return( 1 );
}

int main( int argc, char** argv )
//-------------------------------
// Explore the AC bias recording process by naive simulation.
{
  int i, n;
  float sum, r, mag;
  TAPE tape;

  printf( "\n" );
  printf( "Magsimo: Naive direct simulation of magnetic recording processes.\n" );
  printf( "=================================================================\n\n" );

  //char temp[8];
  //fprintf( stderr, "Attach debugger (and then press return key).\n" );
  //fgets( temp, sizeof(temp), stdin );

  // Make a simulated tape segment.
  // It is created in an "erased state" with (roughly) equal numbers of +ve and -ve
  // particle polarities which will give (roughly) zero overall magnetization.
  printf( "Making a tape segment ...\n" );
  xseed = 217554523;
  if( ! make_tape( &tape, 150 ) )
    fprintf( stderr, "Failed to make_tape()\n" );

  // Measure the X component of the magnetization of the tape .
  mag = measure_magnetisation( &tape );
  printf( "... Initial magnetization = %f\n", mag );

  // Find the ambient field at every particle position due to all the other
  // particles. Plot the ambient field strength.
  printf( "Finding the internal ambient field.\n" );
  find_ambient_field( &tape, 0.0f );
  plot_magnetisation( &tape, "field.txt", 1 );

  // Find the -ve and +ve switching fields: The X component of an external field that
  // will switch each particle to -ve and +ve polarity.
  printf( "Finding the switching fields (and saving plot files).\n" );
  find_switching_fields( &tape );
  plot_magnetisation( &tape, "hplus.txt", 2 );
  plot_magnetisation( &tape, "hminus.txt", 3 );

  // Draw the Preisach diagram with each particle located on the +ve vs. -ve switching
  // field plane.
  printf( "Plotting the Preisach diagram.\n" );
  plot_switching_fields( &tape, "diag.txt" );

  // Plot the density of particles on the +ve vs. -ve switching field plane.
  printf( "Plotting the J function - particle density on the Preisach diagram.\n" );
  plot_j_function( &tape, 100, "jfunc.txt" );

  // Draw an animation illustrating how the AC bias process progressively switches particle
  // polarities as the (bias+signal) feld decays away.
  printf( "Illustrating the AC bias process with an animation.\n\n" );
  ac_bias_animation( &tape, 0.1f, "acbias_sig12_anim" );
  printf( "\n" );
  ac_bias_animation( &tape, 0.0f, "acbias_sig00_anim" );
  printf( "\n" );

  // Draw the B vs. H curve starting from the erased state for each H value.
  // This will show a highly non-linear characteristic.
  printf( "Plotting the B-H curve without AC bias (non-linear).\n" );
  plot_anhysteretic_b_h_curve( &tape, "anhysteretic_bh.txt" );

  // Draw the B vs. H curve using the ac bais recording process.
  // This will show a highly linear central region.
  printf( "Plotting the B-H curve with AC bias (linear).\n" );
  plot_ac_bias_curve( &tape, "acbias_bh.txt" );

  return( 0 );
}
