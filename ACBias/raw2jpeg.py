#
# Post-process raw animation images from magsimo.c in to
# JPEG files with some annotation.
#
#  Copyright (C) 2012 Nick Glazzard
#  Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

import Image
import ImageDraw
import ImageFont
import array

def raw2jpeg( inname, outname, w, h, signal ):
    f = open( inname, "rb" )
    red = array.array('B')
    red.fromfile( f, w*h )
    green = array.array('B')
    green.fromfile( f, w*h )
    blue = array.array('B')
    blue.fromfile( f, w*h )
    f.close()

    imager = Image.new( "L", (w,h) )
    for j in range(0,h):
        for i in range(0,w):
            imager.putpixel( (i,j), int(red[i+j*w]) )
    imageg = Image.new( "L", (w,h) )
    for j in range(0,h):
        for i in range(0,w):
            imageg.putpixel( (i,j), int(green[i+j*w]) )
    imageb = Image.new( "L", (w,h) )
    for j in range(0,h):
        for i in range(0,w):
            imageb.putpixel( (i,j), int(blue[i+j*w]) )

    imagergb = Image.merge( "RGB", [imager,imageg,imageb] )

    sh = ( ( 1.0 - signal ) / ( 1.0 + signal ) ) * ( h - 1 )
    
    arial = ImageFont.truetype( "C:/Windows/Fonts/Arial.ttf", 20 )
    draw = ImageDraw.Draw( imagergb )
    draw.line( [(0,0),(0,h-1)] )
    draw.line( [(0,0),(w-1,0)] )
    draw.line( [(0,0),(w-1,h-1)] )
    draw.line( [(0,0),(w-1,sh)], fill="yellow" )
    draw.line( [(30,h-50), (40,h-30), (50,h-50)] )
    draw.line( [(40,h-70), (40,h-30)] )
    draw.text( (60,h-60), "H-", font=arial )
    draw.line( [(w-50,30), (w-30,40), (w-50,50)] )
    draw.line( [(w-70,40), (w-30,40)] )
    draw.text( (w-60,60), "H+", font=arial )
    o = imagergb.transpose( Image.FLIP_TOP_BOTTOM )
    o.save( outname )

width = 400
height = 400
signal = 0.0
seqname = "acbias_sig00_anim"
framestart = 1
frameend = 400
for frame in range(framestart,frameend+1):
    name = "{1}.{0:0>4d}.".format( frame, seqname )
    print name
    raw2jpeg( name+"raw", name+"jpg", width, height, signal )
