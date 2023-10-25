Rails.application.routes.draw do

  resources :users
  
  resources :tools do
    resources :items, only: [:create, :update]
  end
  
  resources :items
  resources :user_tools, only: [:create, :index]  
  
  post 'user_items', to: 'user_items#create'
  post 'user_tools', to: 'user_tools#create'

  resources :user_items, only: [:create, :index] do
    collection do
      get 'final_items'
    end
  end
end


