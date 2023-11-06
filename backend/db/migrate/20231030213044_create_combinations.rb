class CreateCombinations < ActiveRecord::Migration[7.0]
  def change
    create_table :combinations do |t|
      t.references :tool
      t.references :item1
      t.references :item2
      t.references :creation
      t.timestamps
    end
    add_foreign_key :combinations, :tools, column: :tool_id, primary_key: :id
    add_foreign_key :combinations, :items, column: :item1_id, primary_key: :id
    add_foreign_key :combinations, :items, column: :item2_id, primary_key: :id
    add_foreign_key :combinations, :items, column: :creation_id, primary_key: :id
  end
end
