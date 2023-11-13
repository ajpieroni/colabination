class Tool < ActiveRecord::Migration[7.0]
  def change
    create_table :tools do |t|
      t.string :name
      t.string :description
      t.integer :globalCount
      # sprite
      # usable items, maybe an array
      t.timestamps
    end
  end
end
