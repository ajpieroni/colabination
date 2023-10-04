Rails.application.routes.draw do
  resources :users
  resources :tools
  resources :items

  namespace :api do
    get 'combinations', to: 'combinations#index'
    put 'update_items', to: 'combinations#update_items'
  end
end
