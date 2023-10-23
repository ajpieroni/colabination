class IsFinalItemToItems < ActiveRecord::Migration[7.0]
  def change
    add_column :items, :isFinal, :boolean
  end
end
