class Tool < ApplicationRecord
    has_one_attached :sprite
    has_many :item_tools
    has_many :tool, through: :item_tools
    has_many :user_items
    has_many :item, through: :user_items
    has_many :user_tools
    has_many :users, through: :user_tools
end
