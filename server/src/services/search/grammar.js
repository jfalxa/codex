// @TODO do something with the naming, it's getting out of hand.
module.exports =
`
start
    = expression

_ "optional whitespace"
    = [ ]*

__ "mandatory whitespace"
    = [ ]+

and
    = "and"

or
    = "or"

not
    = "not"

word
    = $[^"'.,\(\) ]+
    / '"' str:$[^"]+ '"' { return str }
    / "'" str:$[^']+ "'" { return str }

set
    = word

label
    = "." lbl:word { return lbl }

expression
    = union

union
    = left:leftprimary __ or __ right:union { return ['or'].concat( left, [right] ) }
    / left:intersection __ or __ right:union { return ['or', left, right] }
    / intersection

intersection
    = left:leftprimary __ and __ right:intersection { return ['and'].concat( left, [right] ) }
    / left:primary __ and __ right:intersection { return ['and', left, right] }
    / primary

leftprimary
    = left:primary _ "," _ right:leftprimary { return [left].concat( right ) }
    / prm:primary { return [prm] }

primary
    = "(" _ exp:expression _ ")" { return exp }
    / not _ opd:primary { return ['not', opd] }
    / type:label __ value:set { return [type, value] }
    / set
`;
