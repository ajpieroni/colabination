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

# Creating items
paper = Item.create(name: 'paper', description: 'A sheet of paper', item_type: 'material', rarity: 1)
yarn = Item.create(name: 'yarn', description: "string", item_type:"material", rarity:1)
wood = Item.create(name: 'wood', description: "string", item_type:"material", rarity:1)
trash = Item.create(name: 'trash', description: "string", item_type:"material", rarity:1)


# wood = Item.create(name: 'Yarn', description: "string", item_type:"material", rarity:1)

# rock = Item.create(name: 'Rock', description: 'A small rock', item_type: 'material', rarity: 1, location: 'Garden')

# Creating tools
hammer = Tool.create(name: 'hammer', description: 'Useful for hammering things', globalCount: 100)
scissors = Tool.create(name: 'scissors', description: 'Useful for cutting paper', globalCount: 150)

# Creating item-tools relationships
ItemTool.create(item: paper, tool: hammer)
ItemTool.create(item: paper, tool: scissors)
ItemTool.create(item: paper, tool: hammer)

user1 = User.create(username:"cats", pin:1234)


# # seeds 3 items
# item1 = Item.create(name: "paper", description: "pog", item_type: "sticker", rarity: 0)
# item2 = Item.create(name: "paper", description: "pog1", item_type: "sticker", rarity: 1)
# item3 = Item.create(name: "paper", description: "pog3", item_type: "clothing", rarity: 0)


# scissor = Tool.create(name: "scissor", description: "it cuts materials", globalCount: 0)
# hammer = Tool.create(name: "hammer", description: "it slams stuff", globalCount: 0)

# user1 = User.create(username: "pandaMan", pin: 1234)
# user2 = User.create(username: "bruin36", pin: 2468)

# itemTool1 = ItemTool.create(item: item1, tool: hammer)

puts 'successfully seeded'


