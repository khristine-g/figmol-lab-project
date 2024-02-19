Rails.application.routes.draw do
  resources :users
  resources :quizzes, only: [:index, :show] do
    resources :questions, only: [:index, :show] do
      resources :answers, only: [:index, :show]
    end
  end

  post '/signup', to: 'auth#signup'
  post '/login', to: 'auth#login'

  post '/create-quiz', to: 'quizzes#create_quiz'
  get '/quizzes/show_by_title/:title', to: 'quizzes#show_by_title'
end
