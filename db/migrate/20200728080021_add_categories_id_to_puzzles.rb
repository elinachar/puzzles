class AddCategoriesIdToPuzzles < ActiveRecord::Migration[5.2]
  def change
    add_column :puzzles, :category_id, :integer
    add_index :puzzles, :category_id
  end
end
