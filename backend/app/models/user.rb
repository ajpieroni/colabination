class User < ApplicationRecord
    has_many :tool
    has_many :user_items
    has_many :item, through: :user_items
end
