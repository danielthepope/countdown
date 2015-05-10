# Countdown
A word game solver bearing no resemblance to the show on Channel 4 whatsoever.

# Getting started
Usual node stuff. Make sure you have `gulp-cli` installed on your command line (`npm install gulp-cli -g`), then you can install using `npm install`.

# Basic usage
## Command line
If you type `node countdown.js`, you get a recurring prompt. Input your anagram, and in true Susie Dent style it will give you the best words.

e.g.
```
> node countdown.js
  ready
  type input to solve (EXIT to exit)
> EMNRITFOS
  [ 'FERMIONS', 'SETIFORM', 'ENSIFORM' ]
  another? type EXIT to exit
> EAUPTDMAD
  [ 'ADAPTED', 'UPDATED' ]
  another? type EXIT to exit
> SODIGESOW
  [ 'GOODIES', 'WOODIES', 'ISODOSE' ]
```

## Web interface
Run the web server using `gulp`. It will default to port 3000. You can then go to [localhost:3000](http://localhost:3000).

The same interface that's live at [countdown.danielthepope.co.uk](http://countdown.danielthepope.co.uk). Hitting that site will generate an anagram for you, or you can add the anagram of your choosing to the URL (e.g. [/tnetennba](http://countdown.danielthepope.co.uk/tnetennba)) and it will generate the results for you.

![tnetennba](resources/readme/tnetennba.png)

# Word list
The word list in use is from [Aspell](http://wordlist.aspell.net/dicts/). The full list is filtered for my program to remove proper nouns and those with apostrophes. The list comes with the following copyright notice.

Copyright 2000-2015 by Kevin Atkinson

Permission to use, copy, modify, distribute and sell these word lists, the associated scripts, the output created from the scripts, and its documentation for any purpose is hereby granted without fee, provided that the above copyright notice appears in all copies and that both that copyright notice and this permission notice appear in supporting documentation. Kevin Atkinson makes no representations about the suitability of this array for any purpose. It is provided "as is" without express or implied warranty.
