var meow = require('meow')
var clp = require('../lib/colorpath')

var cli = meow(`
    Usage
      $ clp <arguments> <method>
 
    Methods
      -t, --tint  tint <source> color with a <percentage> 
      -s, --shade  shade <source> color with a <percentage> 
      -m, --mix  mix <source> color and <mixer> color with a <percentage>
      --find-tint  find the percentage with which <source> color is tinted to <destination> color 
      --find-shade  find the percentage with which <source> color is shaded to <destination> color 
      --find-path  find which path <source> color should take to get to <destination> color 

    Examples
      $ clp FF08D5,0.4 -t
`, {
  alias: {
    t: 'tint',
    s: 'shade',
    m: 'mix'
  }
})

var flags = Object.keys(cli.flags)
var method

if (flags.length === 0) {
  cli.showHelp()
} else {
  method = flags[flags.length - 1]
  if (!clp[method]) cli.showHelp()

  console.log(clp[method].apply(null, cli.input))
}