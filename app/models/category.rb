class Category < ApplicationRecord
  has_many :puzzles, dependent: :destroy, inverse_of: :category
  accepts_nested_attributes_for :puzzles, allow_destroy: true, reject_if: :all_blank

  mount_uploader :image_url, ImageUploader

  def to_param
    name.downcase
  end

end
