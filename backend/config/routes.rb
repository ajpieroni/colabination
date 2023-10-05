Rails.application.routes.draw do
  resources :users
  
  resources :tools do
    resources :items, only: [:create, :update]
  end
  
  resources :items

  namespace :api do
    resources :combinations, only: [:index, :update]
    get 'combinations', to: 'combinations#index'
    put 'update_items', to: 'combinations#update_items'
  end
end
