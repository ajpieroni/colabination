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
    paper = Item.create(name: 'Paper', description: 'A sheet of paper', item_type: 'material', rarity: 1)
    glass = Item.create(name: 'Glass', description: 'A clear sheet of melted glass', item_type: 'material', rarity: 1)
    thread = Item.create(name: 'Thread', description: 'A cloth string', item_type: 'material', rarity: 1)
    metal = Item.create(name: 'Metal', description: 'A substance of shininess and conductivity', item_type: 'material', rarity: 1)
    plastic = Item.create(name: 'Plastic', description: 'A synthetic material from polymers', item_type: 'material', rarity: 1)
    nothing = Item.create(name: ' ', description: ' ', item_type: 'nothing', rarity: 1)

#Creating paper trail
    wood = Item.create(name: 'Wood', description: "It comes from trees", item_type:"material", rarity:1)
    cutpaper = Item.create(name: 'Cut Paper', description: 'Sheet of paper, but cut', item_type: 'material', rarity: 1)
    card = Item.create(name: 'Card', description: 'Paper folded in half', item_type: 'material', rarity:1)


# Creating tools
    hammer = Tool.create(name: 'Hammer', description: 'Useful for hammering things', globalCount: 100)
    scissors = Tool.create(name: 'Scissors', description: 'Useful for cutting paper', globalCount: 150)
    hands = Tool.create(name: 'Hands', description: 'Use your hands to craft things', globalCount: 100)
    hatpress = Tool.create(name: 'Hat Press', description: "Useful for making things round", globalCount: 1)
    sandpaper = Tool.create(name: "Sandpaper", description: "Useful for smoothing things out", globalCount: 1)
    saw = Tool.create(name: "Saw", description: "Useful for bigger cuts", globalCount: 1)
    solder = Tool.create(name: "Soldering Rod", description: "Melts things together", globalCount: 1)
    cricut = Tool.create(name: "Cricut Vinyl Cutter", description: "Makes stickers", globalCount: 1)
    lasercutter = Tool.create(name: "Laser Cutter", description: "Extremely precise cuts", globalCount: 1)
    screwdriver = Tool.create(name: "Screwdriver", description: "Useful for securing materials together", globalCount: 1)
    sewingmachine = Tool.create(name: "Sewing Machine", description: "Useful for sewing", globalCount: 1)

# Creating item-tools relationships
    ItemTool.create(item: paper, tool: hammer)
    ItemTool.create(item: paper, tool: scissors)
    ItemTool.create(item: paper, tool: hammer)

# Creating fake userbase
    user1 = User.create(username:"cats", pin:1234)

# Creating paper combos
    Combination.create(tool: hammer, item1: paper, item2: paper, creation: wood)
    Combination.create(tool: hands, item1:paper, item2: nothing, creation: card)


# scissor = Tool.create(name: "scissor", description: "it cuts materials", globalCount: 0)
# hammer = Tool.create(name: "hammer", description: "it slams stuff", globalCount: 0)

# user1 = User.create(username: "pandaMan", pin: 1234)
# user2 = User.create(username: "bruin36", pin: 2468)

# itemTool1 = ItemTool.create(item: item1, tool: hammer)

puts 'successfully seeded'


