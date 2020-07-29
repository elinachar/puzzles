Rails.application.routes.draw do
  devise_for :users
  resources :users
  resources :categories, param: :name do
    resources :puzzles, param: :name
  end

  root "categories#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
