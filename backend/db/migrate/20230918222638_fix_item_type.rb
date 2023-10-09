class FixItemType < ActiveRecord::Migration[7.0]
  def change
    rename_column :items, :type, :item_type
  end
end
