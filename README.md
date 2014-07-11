=====================
SVG utility classes for JavaScript / TypeScript
=====================

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
