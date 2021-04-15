export interface Drink {
  description: string
  category: string
  img: string
  name: string
}

const drinks: Drink[] = [
  {
    description:
      'The Roosevelt Room’s Buffalo Trace Bourbon, Demerara syrup, Angostura bitters, Wormwood bitters, orange peel',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393088998-H9TPM7Q6RU2JDAR9B7W8/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/rr-old-fashioned-cocktail.png?format=750w',
    name: 'THE ROOSEVELT ROOM OLD FASHIONED',
  },
  {
    description:
      'Leopold Bros Small Batch & Navy Strength Gin, Dolin Dry Vermouth, Cocchi Americano, lemon oils',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393122203-ALNLEQNH00S6ZXA04OX2/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/rr-martini-cocktail.png?format=750w',
    name: 'THE ROOSEVELT ROOM MARTINI',
  },
  {
    description: 'Topo Chico, Kubler Absinthe, lime juice',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393143857-G7AANGIAQOC8K9QT9TJV/ke17ZwdGBToddI8pDm48kCXTVg0ByO0p77g6bpZL7-t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmk1-G7qBQURsAV0YbehnHbRDRrnqU5FQwk42o6RTKaQtzBVvYobBR3tqYNOSVibD-/death-valley-cocktail.png?format=750w',
    name: 'DEATH VALLEY',
  },
  {
    description: 'Tito’s Vodka, shiso, pink peppercorn syrup, lime, lemon, cucumber bitters',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393170362-BP4K9M4JYAQIEW5RA6EO/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/shiso-rona-cocktail.png?format=750w',
    name: 'SHISO RONA',
  },
  {
    description: 'George Dickel Rye Whiskey, Lustau Manzanilla Sherry, Amaro Nardini, strawberry-basil purée, ginger syrup, lemon, barrel-smoked cracked black pepper',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393194352-GHGO30Y9DFTFXZ5J2WWZ/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/buck-to-the-future-cocktail.png?format=750w',
    name: 'BUCK TO THE FUTURE',
  },
  {
    description: 'Brennivin Aquavit, RR Banana liqueur blend, RR Orgeat, lemon, toasted sesame oil, egg white, grated cinnamon',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393226931-SPS8LDV9LPKDQPWMYLVG/ke17ZwdGBToddI8pDm48kCXTVg0ByO0p77g6bpZL7-t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmk1-G7qBQURsAV0YbehnHbRDRrnqU5FQwk42o6RTKaQtzBVvYobBR3tqYNOSVibD-/jingu-bang-cocktail.png?format=750w',
    name: 'JINGU BANG',
  },
  {
    description: 'Santa Teresa 1796 Rum, Plantation Pineapple Rum, Cruzan Blackstrap Rum, RR Allspice Dram, Borghetti espresso liqueur, cinnamon syrup, butter powder, acid phosphate, salt tincture, grated tonka bean',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393258246-L9BR1EBBY7CIGQIOKTZO/ke17ZwdGBToddI8pDm48kFY861m5mKYcfWL5Z32DsKN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmvxnduKw8oArHY0VgTI7pJi3sa8s_osguhYqnXZMolvtgYXSooo2Rq3VSIfwXFn1/butterbean-cocktail.png?format=750w',
    name: 'BUTTERBEAN',
  },
  {
    description: 'Arette Blanco Tequila, red grape, thai basil, coconut, honey, jasmine water, lychee juice, verjus',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393287530-FTKEY0P62QWPEZG2DMT7/ke17ZwdGBToddI8pDm48kCXTVg0ByO0p77g6bpZL7-t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmk1-G7qBQURsAV0YbehnHbRDRrnqU5FQwk42o6RTKaQtzBVvYobBR3tqYNOSVibD-/too-little-too-late-cocktail.png?format=750w',
    name: 'TOO LITTLE, TOO LATE',
  },
  {
    description: 'Almond-butter washed Monkey Shoulder Scotch, Smith & Cross Jamaican Rum, Lustau Amontillado Sherry, apple-toasted oat syrup, Abbott’s bitters, salt tincture, dehydrated apple, grated nutmeg',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393317361-IGV3X8XR6L9MD4C43WJS/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/far-from-the-tree-cocktail.png?format=750w',
    name: 'FAR FROM THE TREE',
  },
  {
    description: 'Takara Rice Shochu, Jameson Caskmates IPA edition, mint, tarragon, cinnamon syrup, verjus, shiso furikake flakes',
    category: 'House Creations',
    img: 'https://images.squarespace-cdn.com/content/v1/5821fc5ed1758ec12ed422ac/1540393340918-XFP0TGKS849R8V3XVSLY/ke17ZwdGBToddI8pDm48kNh0UjeUEkELt9ag3xjN8ZIUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcXxswc8EfUguKXjVAL-zZj3SPOTKQj22ij1PXU-aQ_B8yIajLlultWCmudePt8wDK/run-the-jules-cocktail.png?format=750w',
    name: 'RUN THE JULES',
  },
  /*{
    description: '',
    category: 'House Creations',
    img: '',
    name: '',
  },*/
]

export function random() {
  return drinks[Math.floor(Math.random() * drinks.length)]
}
