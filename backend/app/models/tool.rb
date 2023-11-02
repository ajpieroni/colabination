class Tool < ApplicationRecord
    has_one_attached :sprite
    has_many :tool
    has_many :user_tools
    has_many :users, through: :user_tools
    has_many :item, through: :item_tools
    has_many :combinations,  :class_name => 'Combination', :foreign_key => 'tool_id'
end
