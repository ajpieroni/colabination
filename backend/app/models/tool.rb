class Tool < ApplicationRecord
    has_one_attached :sprite
    has_many :tool
    has_many :user_tools
    has_many :users, through: :user_tools
    has_many :item, through: :item_tools

end
