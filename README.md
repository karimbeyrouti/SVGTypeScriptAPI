SVG - JS / TypeScript API
========
**Example:** http://kurst.co.uk/samples/svg/

This is a simple and basic API for creating SVG graphics using TypeScript ( or JavaScript ) .

Code example: 

```
this.svg = new SVGCanvas( htmlElement ); // Create an SVG element
this.svg.width = 800;
this.svg.height = 600;

this.rect = new SVGRectangle();// Create & add Rectangle
this.rect.width = 200;
this.rect.height = 200;
this.rect.x = 10;
this.rect.y = 10;
this.arcPath.fill( '#00ff00' );
this.svg.append( this.rect );
```		
		
Setup
========
1) install nodejs ( http://nodejs.org/ )

2) install grunt cli

        sudo npm install -g grunt-cli

3) install the dependencies used by the build script:

        sudo npm install

   this will also install front end JavaScript dependencies using Bower. However you might still need to
   run the following:

        bower install

4) to compile the project, run:

        grunt

5) to run the grunt watch, this will compile changes as you save:

        grunt watch

6) to export a release build run:

		grunt release
