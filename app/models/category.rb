class Category < ApplicationRecord
  has_many :puzzles
  mount_uploader :image_url, ImageUploader

end
