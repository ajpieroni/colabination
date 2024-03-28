class Item < ApplicationRecord
    # supposedly allows for local image attachment, not sure
    has_one_attached :sprite
    has_many :item
    has_many :user_items
    has_many :users, through: :user_items
    has_many :tool, through: :item_tools
    has_many :item1s, :class_name => 'Combination', :foreign_key => 'item1_id'
    has_many :item2s, :class_name => 'Combination', :foreign_key => 'item2_id'
    has_many :creations, :class_name => 'Combination', :foreign_key => 'creation_id'
    
    scope :creations_by_tool, ->(tool_id) {
    joins(item1s: :tool).where(combinations: {tool_id: tool_id})
    .or(joins(item2s: :tool).where(combinations: {tool_id: tool_id}))
  }
end
