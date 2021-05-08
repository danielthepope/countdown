# Countdown
A word game solver bearing no resemblance to the show on Channel 4 whatsoever.

# Getting started
Requires Node.js (8+)

```
npm install    # Get dependencies
npm run build  # JS and CSS optimisations
npm start      # Run on port 3000
```

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
Run the web server using `npm start`. You can then go to [localhost:3000](http://localhost:3000).

By default, this app will run on port 3000, but you can change it by setting the `PORT` environment variable. e.g. `PORT=3001 npm start`

This is the same interface that's live at [countdown.danielthepope.co.uk](https://countdown.danielthepope.co.uk). Hitting that site will generate an anagram for you, or you can add the anagram of your choosing to the URL (e.g. [/tnetennba](https://countdown.danielthepope.co.uk/tnetennba)) and it will generate the results for you.

![tnetennba](resources/readme/tnetennba.png)

# Word list
I am using the [Aspell](http://wordlist.aspell.net/dicts/) word list.
```
Custom wordlist generated from http://app.aspell.net/create using SCOWL
with parameters:
  diacritic: strip
  max_size: 70
  max_variant: 1
  special: <none>
  spelling: GBs GBz

Using Git Commit From: Mon Dec 7 20:14:35 2020 -0500 [5ef55f9]

Copyright 2000-2019 by Kevin Atkinson

  Permission to use, copy, modify, distribute and sell these word
  lists, the associated scripts, the output created from the scripts,
  and its documentation for any purpose is hereby granted without fee,
  provided that the above copyright notice appears in all copies and
  that both that copyright notice and this permission notice appear in
  supporting documentation. Kevin Atkinson makes no representations
  about the suitability of this array for any purpose. It is provided
  "as is" without express or implied warranty.

Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.

  The following restriction is placed on the use of this publication:
  if The UK Advanced Cryptics Dictionary is used in a software package
  or redistributed in any form, the copyright notice must be
  prominently displayed and the text of this document must be included
  verbatim.

  There are no other restrictions: I would like to see the list
  distributed as widely as possible.

Special credit also goes to Alan Beale <biljir@pobox.com> as he has
given me an incredible amount of feedback and created a number of
special lists (those found in the Supplement) in order to help improve
the overall quality of SCOWL.

Many sources were used in the creation of SCOWL, most of them were in
the public domain or used indirectly.  For a full list please see the
SCOWL readme.

http://wordlist.aspell.net/
```

I've previously used the [Moby word list](http://icon.shef.ac.uk/Moby/mwords.html).

# API
As well as a web interface, Countdown serves its own API. It's available through [RapidAPI](https://rapidapi.com/danielthepope/api/countdown).
