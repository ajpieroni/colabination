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

# Creating base items
    paper = Item.create(name: 'paper', description: 'A sheet of paper', item_type: 'material', rarity: 1)
    glass = Item.create(name: 'glass', description: 'A clear sheet of melted glass', item_type: 'material', rarity: 1)
    thread = Item.create(name: 'thread', description: 'A cloth string', item_type: 'material', rarity: 1)
    metal = Item.create(name: 'metal', description: 'A substance of shininess and conductivity', item_type: 'material', rarity: 1)
    plastic = Item.create(name: 'plastic', description: 'A synthetic material from polymers', item_type: 'material', rarity: 1)
    nothing = Item.create(name: 'nothing', description: ' ', item_type: 'nothing', rarity: 1)

#Creating paper trail
    wood = Item.create(name: 'wood', description: "It comes from trees", item_type:"material", rarity:1)
    cutpaper = Item.create(name: 'cut paper', description: 'Sheet of paper, but cut', item_type: 'material', rarity: 1)
    card = Item.create(name: 'card', description: 'Paper folded in half', item_type: 'material', rarity:1)
    kite = Item.create(name: 'kite', description: 'Fly high!', item_type: 'material', rarity:1)
    origami = Item.create(name: 'origami', description: 'Folds on folds on folds', item_type: 'material', rarity:1)

# Creating glass trail
    stainedglass = Item.create(name:'stainedglass', description: "colorful window! looks good in sunlight", item_type: 'material', rarity: 1)
    window = Item.create(name: 'window', description: "helps you look outside from inside", item_type: "material", rarity: 1)

# Creating tools
    hammer = Tool.create(name: 'hammer', description: 'Useful for hammering things', globalCount: 100)
    scissors = Tool.create(name: 'scissors', description: 'Useful for cutting paper', globalCount: 150)
    hands = Tool.create(name: 'hands', description: 'Use your hands to craft things', globalCount: 100)
    hatpress = Tool.create(name: 'hat press', description: "Useful for making things round", globalCount: 1)
    sandpaper = Tool.create(name: "sandpaper", description: "Useful for smoothing things out", globalCount: 1)
    saw = Tool.create(name: "saw", description: "Useful for bigger cuts", globalCount: 1)
    solder = Tool.create(name: "soldering rod", description: "Melts things together", globalCount: 1)
    cricut = Tool.create(name: "cricut vinyl cutter", description: "Makes stickers", globalCount: 1)
    lasercutter = Tool.create(name: "laser cutter", description: "Extremely precise cuts", globalCount: 1)
    screwdriver = Tool.create(name: "screwdriver", description: "Useful for securing materials together", globalCount: 1)
    sewingmachine = Tool.create(name: "sewing machine", description: "Useful for sewing", globalCount: 1)



    user1 = User.create(username: "pandaMan", pin: 1234)
    user2 = User.create(username: "bruin36", pin: 2468)
    user3 = User.create(username: "cats", pin: 1234)
# Creating item-tools relationships
    ItemTool.create(item: paper, tool: hammer)
    ItemTool.create(item: paper, tool: scissors)
    ItemTool.create(item: paper, tool: hammer)

# Creating paper combos
# !Paper combos: level 1
    Combination.create(tool: hammer, item1: paper, item2: paper, creation: wood)
    Combination.create(tool: scissors, item1: paper, item2: nothing, creation: cutpaper)
    Combination.create(tool: hands, item1: paper, item2: thread, creation: kite)
    Combination.create(tool: hands, item1:paper, item2: nothing, creation: card)
    # !Paper combos: level 2
    Combination.create(tool: hands, item1:card, item2: nothing, creation: origami)

# Glass combos:
    Combination.create(tool: hammer, item1: glass, item2: wood, creation: window)
    Combination.create(tool: solder, item1: window, item2: nothing, creation: stainedglass)

# scissor = Tool.create(name: "scissor", description: "it cuts materials", globalCount: 0)
# hammer = Tool.create(name: "hammer", description: "it slams stuff", globalCount: 0)

# user1 = User.create(username: "pandaMan", pin: 1234)
# user2 = User.create(username: "bruin36", pin: 2468)

# itemTool1 = ItemTool.create(item: item1, tool: hammer)

puts 'successfully seeded'


