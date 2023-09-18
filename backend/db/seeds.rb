# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'seeding'

item1 = Item.create(name: "item1", description: "pog", item_type: "sticker", rarity: 0)
item2 = Item.create(name: "item2", description: "pog1", item_type: "sticker", rarity: 1)
item3 = Item.create(name: "item3", description: "pog3", item_type: "clothing", rarity: 0)

puts 'successfully seeded'