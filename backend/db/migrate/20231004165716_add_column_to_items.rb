class AddColumnToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :hasFound, :boolean
    add_column :tools, :hasFound, :boolean

  end
end
