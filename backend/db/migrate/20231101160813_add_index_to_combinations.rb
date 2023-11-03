class AddIndexToCombinations < ActiveRecord::Migration[7.0]
  def change
    add_index :combinations, :tool_id, name: "index_tool_id_combinations"
  end
end
