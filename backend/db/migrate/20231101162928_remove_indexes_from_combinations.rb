class RemoveIndexesFromCombinations < ActiveRecord::Migration[7.0]
  def change
    remove_index :combinations, name: "index_tool_id_combinations"
  end
end
