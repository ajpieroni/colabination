# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'seeding'


# Clear previous data
# ItemTool.destroy_all
# Item.destroy_all
# Tool.destroy_all
# UserItem.destroy_all

# !Test Final Items

# Creating base items
    paper = Item.create(name: 'paper', description: 'A sheet of paper', item_type: 'material', rarity: 1, isFinal: false)
    glass = Item.create(name: 'glass', description: 'A clear sheet of melted glass', item_type: 'material', rarity: 1, isFinal: false)
    thread = Item.create(name: 'thread', description: 'A cloth string', item_type: 'material', rarity: 1, isFinal: false)
    metal = Item.create(name: 'metal', description: 'A substance of shininess and conductivity', item_type: 'material', rarity: 1, isFinal: false)
    plastic = Item.create(name: 'plastic', description: 'A synthetic material from polymers', item_type: 'material', rarity: 1, isFinal: false)
    nothing = Item.create(name: 'nothing', description: ' ', item_type: 'nothing', rarity: 1, isFinal: false)
    trash =  Item.create(name: 'trash', description: 'A whole lot of junk', item_type: 'nothing', rarity: 1, isFinal: true)


#Creating paper trail
    notebook = Item.create(name: 'notebook', description: 'For writing!', item_type: 'material', rarity: 1, isFinal: true)
    wood = Item.create(name: 'wood', description: "It comes from trees", item_type:"material", rarity:1, isFinal: false)
    cardboard = Item.create(name: 'cardboard', description: "Thick paper", item_type: 'material', rarity: 1, isFinal: false)
    cutpaper = Item.create(name: 'cut paper', description: 'Sheet of paper, but cut', item_type: 'material', rarity: 1, isFinal: false)
    card = Item.create(name: 'card', description: 'Paper folded in half', item_type: 'material', rarity:1, isFinal: false)
    kite = Item.create(name: 'kite', description: 'Fly high!', item_type: 'material', rarity:1, isFinal: true)
    origami = Item.create(name: 'origami', description: 'Folds on folds on folds', item_type: 'material', rarity:1, isFinal: true)
    confetti = Item.create(name: 'confetti', description: 'Colorful shreds of paper', item_type: 'material', rarity: 1, isFinal: false)
    party = Item.create(name: 'party', description: 'Fun gathering for celebration', item_type: 'material', rarity: 1, isFinal: true)
    woodPlank = Item.create(name: 'woodPlank', description: 'A flat piece of wood', item_type: 'material', rarity: 1, isFinal: false)
    book = Item.create(name: 'book', description: 'A collection of paper', item_type: 'material', rarity: 1, isFinal: true)
    sticker = Item.create(name: 'sticker', description: 'Adhesive paper', item_type: 'material', rarity: 1, isFinal: true)
    table = Item.create(name:'table', description: "For coffee!", item_type: 'material', rarity: 1, isFinal: false)
# Creating glass trail
    sand = Item.create(name: 'sand', description: "Tiny rocks!", item_type: 'material', rarity: 1, isFinal: false)
    sandpaper = Item.create(name: 'sandpaper', description: "For smoothing things out", item_type: 'material', rarity: 1, isFinal: false)
    hourglass = Item.create(name: 'hourglass', description: "Time is running out!", item_type: 'material', rarity: 1, isFinal: true)
    stainedGlass = Item.create(name:'stainedGlass', description: "colorful window! looks good in sunlight", item_type: 'material', rarity: 1)
    window = Item.create(name: 'window', description: "helps you look outside from inside", item_type: "material", rarity: 1)
    brokenGlass = Item.create(name: 'brokenGlass', description: "ouch!", item_type: "material", rarity: 1, isFinal: false)
    wheel = Item.create(name: 'wheel', description: "For rolling!", item_type: "material", rarity: 1, isFinal: false)
    # Creating plastic trail
    vinyl = Item.create(name:'vinyl', description: "Shiny.", item_type: 'material', rarity: 1, isFinal: false)
    # creating thread trail
    hat = Item.create(name:'hat', description: "M'lady.", item_type: 'material', rarity: 1, isFinal: false)
    doll = Item.create(name:'doll', description: "How cute.", item_type: 'material', rarity: 1, isFinal: false)
    jacket = Item.create(name:'jacket', description: "For keeping warm.", item_type: 'material', rarity: 1, isFinal: false)
    box = Item.create(name:'box', description: "For storage.", item_type: 'material', rarity: 1, isFinal: false)
    magnifyingGlass = Item.create(name:'magnifyingGlass', description: "For seeing small things.", item_type: 'material', rarity: 1, isFinal: true)
# Creating metal trail
    aluminum = Item.create(name:'aluminum', description: "Bendy!", item_type: 'material', rarity: 1, isFinal: false)
    aluminumHat = Item.create(name:'aluminumHat', description: "Shiny!", item_type: 'material', rarity: 1, isFinal: true)
    metalSheet = Item.create(name:'metalSheet', description: "Metal, but a sheet of it.", item_type: 'material', rarity: 1, isFinal: false)
    nail = Item.create(name:'nail', description: "For hammering!", item_type: 'material', rarity: 1, isFinal: false)
    metalbars = Item.create(name:'metalbars', description: "Metal, but bars of it.", item_type: 'material', rarity: 1, isFinal: false)
    copper = Item.create(name:'copper', description: "Shiny!", item_type: 'material', rarity: 1, isFinal: false)
    gold = Item.create(name:'gold', description: "Will make you rich!", item_type: 'material', rarity: 1, isFinal: false)
    wire = Item.create(name:'wire', description: "Go fishing!", item_type: 'material', rarity: 1, isFinal: true)
    musicCD = Item.create(name:'musicCD', description: "Pump the jams!", item_type: 'material', rarity: 1, isFinal: false)

    CD = Item.create(name:'CD', description: "DJ time!", item_type: 'material', rarity: 1, isFinal: false)

    lamp = Item.create(name:'lamp', description: "Mood lighting!", item_type: 'material', rarity: 1, isFinal: false)
    chains = Item.create(name:'chains', description: "For big projects, or holding up the minotaur!", item_type: 'material', rarity: 1, isFinal: false)

    bowl = Item.create(name:'bowl', description: "For cereal!", item_type: 'material', rarity: 1, isFinal: false)
    car = Item.create(name:'car', description: "For driving!", item_type: 'material', rarity: 1, isFinal: false)

    prison = Item.create(name:'prison', description: "Uh oh.", item_type: 'material', rarity: 1, isFinal: true)
    armor = Item.create(name:'armor', description: "For protection.", item_type: 'material', rarity: 1, isFinal: false)
    cauldron = Item.create(name:'cauldron', description: "For brewing!", item_type: 'material', rarity: 1, isFinal: false)
    diningTable = Item.create(name:'diningTable', description: "For family meals!", item_type: 'material', rarity: 1, isFinal: false)
    stoplight = Item.create(name:'stoplight', description: "Stop on red!", item_type: 'material', rarity: 1, isFinal: false)


    # level 3
    vinylCD = Item.create(name:'vinylCD', description: "For music all night long.", item_type: 'material', rarity: 1, isFinal: true)
    jewelry = Item.create(name:'jewelry', description: "For decoration of the self.", item_type: 'material', rarity: 1, isFinal: true)
    crown = Item.create(name:'crown', description: "You're royalty!", item_type: 'material', rarity: 1, isFinal: false)
    aluminumFoil = Item.create(name:'aluminumFoil', description: "For wrapping things!", item_type: 'material', rarity: 1, isFinal: false)
    knight = Item.create(name:'knight', description: "Hero in shining armor!", item_type: 'material', rarity: 1, isFinal: false)
    witch = Item.create(name:'witch', description: "Spooky!", item_type: 'material', rarity: 1, isFinal: true)
    family = Item.create(name:'family', description: "Home is where the fam is!", item_type: 'material', rarity: 1, isFinal: false)
    street = Item.create(name:'street', description: "To ride on!", item_type: 'material', rarity: 1, isFinal: false)
    
#    level 4
    monarchDoll = Item.create(name:'monarchDoll', description: "Dolls on dolls.", item_type: 'material', rarity: 1, isFinal: true)
    kingdom = Item.create(name:'kingdom', description: "I used to rule the world...", item_type: 'material', rarity: 1, isFinal: false)
    home = Item.create(name:'home', description: "Humble abode!", item_type: 'material', rarity: 1, isFinal: true)
    city = Item.create(name:'city', description: "Big apple!", item_type: 'material', rarity: 1, isFinal: true)
# level 5
fairytale = Item.create(name:'fairytale', description: "Dreams come true!", item_type: 'material', rarity: 1, isFinal: true)

# !UNKNOWN
lightbulb = Item.create(name:'lightbulb', description: "An idea!", item_type: 'material', rarity: 1, isFinal: false)
brokenScissors = Item.create(name:'brokenScissors', description: "Not useful anymore.", item_type: 'material', rarity: 1, isFinal: true)
wagon = Item.create(name:'wagon', description: "Pull stuff!", item_type: 'material', rarity: 1, isFinal: false)
building = Item.create(name:'building', description: "Store stuff!", item_type: 'material', rarity: 1, isFinal: false)
envelope = Item.create(name:'envelope', description: "For mailing!", item_type: 'material', rarity: 1, isFinal: true)
metalSculpture = Item.create(name:'metalSculpture', description: "Art!", item_type: 'material', rarity: 1, isFinal: true)
birdhouse = Item.create(name:'birdhouse', description: "For birds!", item_type: 'material', rarity: 1, isFinal: true)

# Creating thread trail
    threadBall = Item.create(name:'threadBall', description: "Ball of thread!", item_type: 'material', rarity: 1, isFinal: false)
    macrame = Item.create(name:'macrame', description: "Fancy knots!", item_type: 'material', rarity: 1, isFinal: true)
    cloth = Item.create(name:'cloth', description: "Makes clothes!", item_type: "material", rarity: 1, isFinal: false)
    cutCloth = Item.create(name: 'cutCloth', description: "Cloth, but cut...", item_type: "material", rarity: 1, isFinal: false)
    embroiderythread = Item.create(name: 'embroidery thread', description: 'Thread, but fancier', item_type: "material", rarity: 1, isFinal: false)
    yarn = Item.create(name: 'yarn', description: "Thick, warm string", item_type: "material", rarity: 1, isFinal: false)
    skirt = Item.create(name: 'skirt', description: "Flowy, covers some part of your legs", item_type: "material", rarity: 1, isFinal: false)
    dress = Item.create(name: 'dress', description: "Long flowy garment, covers torso and legs", item_type: "material", rarity: 1, isFinal: false)
    straw = Item.create(name: 'straw', description: "Dried grain, made out of string in this game...", item_type: "material", rarity: 1, isFinal: false)
    scarecrow = Item.create(name: 'scarecrow', description: "Almost human... scares the crows!", item_type: "material", rarity: 1, isFinal: true)
    shirt = Item.create(name: 'shirt', description: "Garment that covers your torso", item_type: "material", rarity: 1, isFinal: false)
    patch = Item.create(name: 'patch', description: "Fixes holes in clothes", item_type: "material", rarity: 1, isFinal: true)

    # Creating tools
    hammer = Tool.create(name: 'hammer', description: 'Useful for hammering things', globalCount: 100)
    scissors = Tool.create(name: 'scissors', description: 'Useful for cutting paper', globalCount: 150)
    hands = Tool.create(name: 'hands', description: 'Use your hands to craft things', globalCount: 100)
    # hatpress = Tool.create(name: 'hat press', description: "Useful for making things round", globalCount: 1)
    # sandpaper = Tool.create(name: "sandpaper", description: "Useful for smoothing things out", globalCount: 1)
    # saw = Tool.create(name: "saw", description: "Useful for bigger cuts", globalCount: 1)
    cricut = Tool.create(name: "cricut vinyl cutter", description: "Makes stickers", globalCount: 1)
    # lasercutter = Tool.create(name: "laser cutter", description: "Extremely precise cuts", globalCount: 1)
    # screwdriver = Tool.create(name: "screwdriver", description: "Useful for securing materials together", globalCount: 1)
    sewingmachine = Tool.create(name: "sewing machine", description: "Useful for sewing", globalCount: 1)
    # mill = Tool.create(name: "mill", description: "Mills and such.", globalCount: 1)
    solderingStation = Tool.create(name: "solderingStation", description: "Melts things together", globalCount: 1)
    printer = Tool.create(name: "printer1", description: "Prints things", globalCount: 1)
    # printer2 = Tool.create(name: "printer1", description: "Prints things", globalCount: 1)



# # Hat press is only used for one item: bowl
#     hatpress = Tool.create(name: 'hat press', description: "Useful for making things round", globalCount: 1)
# # Laser Cutter is only used for one item: musicCD
#     lasercutter = Tool.create(name: "laser cutter", description: "Extremely precise cuts", globalCount: 1)
    
# Sandpaper is not used
    # sandpaper = Tool.create(name: "sandpaper", description: "Useful for smoothing things out", globalCount: 1)
# Saw is not used
    # saw = Tool.create(name: "saw", description: "Useful for bigger cuts", globalCount: 1)
# Cricut is not used
    # cricut = Tool.create(name: "cricut vinyl cutter", description: "Makes stickers", globalCount: 1)

# Screwdriver is not used
    # screwdriver = Tool.create(name: "screwdriver", description: "Useful for securing materials together", globalCount: 1)
   


# seed some users
    user1 = User.create(username: "pandaMan", pin: 1234)
    user2 = User.create(username: "bruin36", pin: 2468)
    user3 = User.create(username: "cats", pin: 1234)
    user4 = User.create(username: "a", pin: 1234)

    
# Creating item-tools relationships
    ItemTool.create(item: paper, tool: hammer)
    ItemTool.create(item: paper, tool: scissors)
    ItemTool.create(item: paper, tool: hammer)

# Creating paper combos
# !Paper combos: level 1
    Combination.create(tool: hands, item1: paper, item2: paper, creation: envelope)
    Combination.create(tool: hammer, item1: metalSheet, item2: nothing, creation: nail)
    Combination.create(tool: hammer, item1: wood, item2: wood, creation: paper)
    Combination.create(tool: scissors, item1: metal, item2: nothing, creation: brokenScissors)
    Combination.create(tool: sewingmachine, item1:paper, item2: thread, creation: notebook )
    # also make broken scissors for 2 metal
    Combination.create(tool: scissors, item1: metal, item2: metal, creation: brokenScissors)
    # also for metalSheet
    Combination.create(tool: scissors, item1: metalSheet, item2: nothing, creation: brokenScissors)
    Combination.create(tool: scissors, item1: metalSheet, item2: metalSheet, creation: brokenScissors)
    # cardboard
    Combination.create(tool: hammer, item1: paper, item2: paper, creation: cardboard)
    Combination.create(tool: scissors, item1: paper, item2: nothing, creation: cutpaper)
    Combination.create(tool: hands, item1: paper, item2: thread, creation: kite)
    Combination.create(tool: hands, item1:paper, item2: nothing, creation: card)
    Combination.create(tool: hammer, item1: wood, item2: nothing, creation: woodPlank)
    # !Paper combos: level 2
    Combination.create(tool: hands, item1:card, item2: nothing, creation: origami)
    Combination.create(tool: scissors, item1: cutpaper, item2: nothing, creation: confetti)
    Combination.create(tool: hands, item1: confetti, item2: card, creation: party)
    Combination.create(tool: hands, item1: card, item2: wood, creation: book)
    # combination for cut paper + cricut = sticker
    Combination.create(tool: cricut, item1: cutpaper, item2: nothing, creation: sticker)
    # cutcloth + cricut = patch
    Combination.create(tool: cricut, item1: cutCloth, item2: nothing, creation: patch)
    
# Glass combos:
    Combination.create(tool: hands, item1: sand, item2: glass, creation: hourglass)
    Combination.create(tool: hammer, item1: glass, item2: wood, creation: window)
    Combination.create(tool: hammer, item1: glass, item2: nothing, creation: brokenGlass)
    Combination.create(tool: solderingStation, item1: window, item2: nothing, creation: stainedGlass)
    Combination.create(tool: solderingStation, item1: glass, item2: metal, creation: magnifyingGlass)
    Combination.create(tool: hammer, item1: brokenGlass, item2: brokenGlass, creation: sand)
    # hands & sand + paper  = sandpaper
    Combination.create(tool: hands, item1: sand, item2: paper, creation: sandpaper)
    # hands & sandpaper + woodPlank = wheel
    Combination.create(tool: hands, item1: sandpaper, item2: woodPlank, creation: wheel)
    # hammer & box + wheel = wagon
    Combination.create(tool: hammer, item1: wheel, item2: box, creation: wagon)
    # box = hammer & woodPlank + woodPlank
    Combination.create(tool: hammer, item1: woodPlank, item2: woodPlank, creation: box)

# !Metal Combos:
    Combination.create(tool: hammer, item1: metal, item2: metal, creation: aluminum)
    Combination.create(tool: hammer, item1: metal, item2: nothing, creation: metalSheet)
    # Combination.create(tool: mill, item1: metal, item2: nothing, creation: metalbars)
    Combination.create(tool: hammer, item1: aluminum, item2: nothing, creation: aluminumFoil)
    Combination.create(tool: hands, item1: aluminumFoil, item2: nothing, creation: aluminumHat)

    # Metal: level 2
    # solderingStation is id 7
    # aluminum is id 30
    # http://localhost:8081/combinations?tool=11&item1=30&item2=30

    # id: 28,
    # is seeded correctly!! ugh
#   tool_id: 11,
#   item1_id: 30,
#   item2_id: 30,
#   creation_id: 38,
#   created_at: Mon, 18 Mar 2024 14:56:10.049626000 UTC +00:00,
#   updated_at: Mon, 18 Mar 2024 14:56:10.049626000 UTC +00:00>,
    Combination.create(tool: solderingStation, item1: aluminum, item2: aluminum, creation: CD)
    Combination.create(tool: hammer, item1: aluminum, item2: aluminum, creation: copper)

    Combination.create(tool: hammer, item1: metalbars, item2: lightbulb, creation: lamp)
    Combination.create(tool: solderingStation, item1: metalbars, item2: thread, creation: chains)

    # Combination.create(tool: hatpress, item1: metalSheet, item2: nothing, creation: bowl)
    # Combination.create(tool: mill, item1: metalSheet, item2: wagon, creation: car)


    # Metal: level 3
    # Combination.create(tool: lasercutter, item1: CD, item2: nothing, creation: musicCD)
    Combination.create(tool: hammer, item1: copper, item2: copper, creation: gold)
    Combination.create(tool: sewingmachine, item1: copper, item2: thread, creation: wire)
    Combination.create(tool: hammer, item1: woodPlank, item2: nail, creation: table)
    Combination.create(tool: solderingStation, item1: chains, item2: metalbars, creation: prison)
    Combination.create(tool: sewingmachine, item1: chains, item2: jacket, creation: armor)
    Combination.create(tool: solderingStation, item1: bowl, item2: bowl, creation: cauldron)
    Combination.create(tool: hands, item1: bowl, item2: table, creation: diningTable)
    Combination.create(tool: hammer, item1: car, item2: lamp, creation: stoplight)


    # Metal: level 4
    Combination.create(tool: solderingStation, item1: musicCD, item2: vinyl, creation: vinylCD)
    Combination.create(tool: sewingmachine, item1: gold, item2: thread, creation: jewelry)
    Combination.create(tool: hammer, item1: gold, item2: hat, creation: crown)
    Combination.create(tool: hands, item1: armor, item2: doll, creation: knight)
    # Witch
    Combination.create(tool: hands, item1: cauldron, item2: doll, creation: witch)
    # Family
    Combination.create(tool: hands, item1: diningTable, item2: doll, creation: family)
    # Street
    Combination.create(tool: hands, item1: stoplight, item2: car, creation: street)
    Combination.create(tool: hammer, item1: metalSheet, item2: nail, creation: metalSculpture)
    Combination.create(tool: hammer, item1: wood, item2: nail, creation: birdhouse)


    # Metal: level 5
    # Monarch doll
    Combination.create(tool: hands, item1: crown, item2: doll, creation: monarchDoll)
    # Kingdom
    Combination.create(tool: hands, item1: knight, item2: monarchDoll, creation: kingdom)
    # Home
    Combination.create(tool: hammer, item1: family, item2: building, creation: home)

    # City
    Combination.create(tool: hands, item1: street, item2: building, creation: city)


    # Metal: level 6
    # Fairy Tale
    Combination.create(tool: hands, item1: kingdom, item2: witch, creation: fairytale)

# Thread combos
    Combination.create(tool: sewingmachine, item1: thread, item2: thread, creation: cloth)
    Combination.create(tool: scissors, item1: cloth, item2: nothing, creation: cutCloth)
    Combination.create(tool: sewingmachine, item1:cloth, item2: nothing, creation: skirt)
    Combination.create(tool: hands, item1: threadBall, item2: nothing, creation: macrame)

    Combination.create(tool: hands, item1: thread, item2: nothing, creation: embroiderythread)
    Combination.create(tool: hammer, item1: thread, item2: nothing, creation: threadBall)
    Combination.create(tool: sewingmachine, item1: embroiderythread, item2: embroiderythread, creation: yarn)
    Combination.create(tool: hands, item1: embroiderythread, item2: nothing, creation:  straw)
    Combination.create(tool: sewingmachine, item1: shirt, item2: skirt, creation: dress)
    Combination.create(tool: sewingmachine, item1: cutCloth, item2: nothing, creation: shirt)
    Combination.create(tool: hands, item1: yarn, item2: dress, creation: doll)
    Combination.create(tool: hands, item1: doll, item2: straw, creation: scarecrow)





puts 'successfully seeded'


