class AddNameAndImageUrlToCategories < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :name, :string
    add_column :categories, :image_url, :string
  end
end
