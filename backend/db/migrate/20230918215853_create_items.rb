class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :type
      t.integer :rarity

      t.timestamps
    end
  end
end
