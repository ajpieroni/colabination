class User < ApplicationRecord
    has_many :user_items
    has_many :items, through: :user_items
    has_many :user_tools
    has_many :tools, through: :user_tools
    validates :username, uniqueness: true
    validates :pin, length: { is: 4 }

end
