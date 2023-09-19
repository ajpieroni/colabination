class Tool < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :description
      t.int :globalCount
      # sprite
      # usable items, maybe an array
  end
end
