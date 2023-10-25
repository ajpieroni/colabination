# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'seeding'

paper = Item.create(name: 'Paper', description: 'A sheet of paper', item_type: 'material', rarity: 1, isFinal: false)
wood = Item.create(name: 'Yarn', description: "string", item_type:"material", rarity:1, isFinal: false)
trash = Item.create(name: 'Trash', description:"dubious trash", item_type:"material", rarity: 1, isFinal:true)

# Creating tools
hammer = Tool.create(name: 'Hammer', description: 'Useful for hammering things', globalCount: 100)
scissors = Tool.create(name: 'Scissors', description: 'Useful for cutting paper', globalCount: 150)

# Creating item-tools relationships
ItemTool.create(item: paper, tool: hammer)
ItemTool.create(item: paper, tool: scissors)
ItemTool.create(item: paper, tool: hammer)


user1 = User.create(username: "pandaMan", pin: 1234)
user2 = User.create(username: "bruin36", pin: 2468)
user3 = User.create(username: "cats", pin: 1234)

puts 'successfully seeded'


