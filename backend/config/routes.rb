Rails.application.routes.draw do
  resources :users
  resources :tools
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # opens up all routes in items
  resources :items
end

Rails.application.routes.draw do
  namespace :api do
    get 'combinations', to: 'combinations#index'
    put 'update_items', to: 'combinations#update_items'
  end
end
