class Tool < ApplicationRecord
    has_one_attached :sprite
    has_many :item_tools
    has_many :tools, through: :item_tools
end
