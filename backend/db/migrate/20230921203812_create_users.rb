class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.integer :pin
      # sprite
      t.timestamps
      t.timestamps
    end
  end
end
