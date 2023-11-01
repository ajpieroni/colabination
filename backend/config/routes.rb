Rails.application.routes.draw do

  resources :users
  
  resources :tools do
    resources :items, only: [:create, :update]
  end
  
  resources :items
  
  post 'user_items', to: 'user_items#create'
  post 'user_tools', to: 'user_tools#create'

  resources :user_items, only: [:create, :index]  

  resources :user_tools, only: [:create, :index]  

  # namespace :api do
  #   resources :combinations, only: [:index, :update]
  #   put 'update_items', to: 'combinations#update_items'
  # end

  resources :combinations, only: [:index]
  get 'combinations_all', to: 'combinations#all'

end
