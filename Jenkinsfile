pipeline {
    parameters {
        choice(
            name: 'ENV',
            choices: ['chromium', 'firefox'],
            description: 'chọn môi trường chạy'
        )
    }

    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        BASE_URL = credentials('BASE_URL')
        API_USERNAME = credentials('API_USERNAME')
        API_PASSWORD = credentials('API_PASSWORD')
        API_WRONG_USERNAME=credentials('API_WRONG_USERNAME')
        API_WRONG_PASSWORD=credentials('API_WRONG_PASSWORD')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Long075/CRM_Project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t playwright-tests .'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                bat 'docker run playwright-tests'
            }
        }

        // stage('Install Dependencies') {
        //     steps {
        //         bat 'npm ci'
        //         bat 'npx playwright install'
        //     }
        // }
        //
        // stage('Run Tests') {
        //     steps {
        //         bat 'npm run test:ci'
        //     }
        // }

        // stage('Run Parallel'){
        //     parallel{
        //         stage('Chrome') {
        //             steps {
        //                 bat 'npx playwright test --project=chromium'
        //             }
        //         }
        //         stage('Firefox') {
        //             steps {
        //                 bat 'npx playwright test --project=firefox'
        //             }
        //         }
        //     }
        // }     
    }

    post {
        always {
            publishHTML([
                allowMissing: false,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                alwaysLinkToLastBuild: true
            ])

            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}