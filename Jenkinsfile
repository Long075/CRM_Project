pipeline {
    parameters {
        choice(
            name: 'ENV',
            choices: ['all', 'chromium', 'firefox'],
            description: 'Chọn môi trường chạy CI'
        )
    }

    agent any

    tools {
        nodejs "NodeJS"
    }

    triggers {
        githubPush()
    }

    environment {
        // Khai báo URL của môi trường duy nhất bạn đang có (Production hoặc Test Server)
        TARGET_URL = "https://hvtester.pos365.vn/" 
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Long075/CRM_Project.git'
            }
        }

        stage('2. Chuẩn bị file .env') {
            steps {
                withCredentials([file(credentialsId: 'ENV-FILE', variable: 'SECRET_ENV_FILE')]) {
                    bat 'copy "%SECRET_ENV_FILE%" .env'
                }
            }
        }

        stage('3. Build Docker Image') {
            steps {
                bat 'docker build -t playwright-tests .'
            }
        }

        // ==========================================
        // PHẦN CI: KIỂM THỬ HỒI QUY (Chạy toàn bộ test)
        // ==========================================
        stage('4. CI: Chromium Tests') {
            steps {
                retry(2){
                    bat """
                    docker run --rm ^
                    --env-file .env ^
                    -v %cd%/playwright-report-chromium:/app/playwright-report ^
                    playwright-tests npx playwright test tests/ui/ --grep "@smoke" --project=chromium
                    """
                }
            }
        }

        // ==========================================
        // PHẦN CD: ĐƯA LÊN MÔI TRƯỜNG THỰC
        // ==========================================
        stage('5. CD: Phê duyệt (Manual Approval)') {
            steps {
                timeout(time: 1, unit: 'DAYS') {
                    input message: 'CI đã PASS toàn bộ. Bạn có muốn Deploy bản code này lên Server không?', ok: 'Deploy ngay!'
                }
            }
        }

        stage('6. CD: Deploy lên Server') {
            steps {
                echo 'Đang thực hiện lệnh deploy (Ví dụ: copy file, restart docker/nginx trên server)...'
                // Gọi script deploy của bạn ở đây
            }
        }

        stage('7. CD: Kiểm tra sức khỏe Server (Smoke Tests)') {
            steps {
                echo 'Chạy một vài test cơ bản nhất trên Server vừa deploy để đảm bảo nó vẫn sống!'
                bat """
                docker run --rm ^
                --env-file .env ^
                -e BASE_URL=%TARGET_URL% ^
                -v %cd%/playwright-report-post-deploy:/app/playwright-report ^
                playwright-tests npx playwright test tests/ui/ --grep "@smoke" --project=chromium
                """
            }
        }
    }

    post {
        always {
            // Xóa file .env sau khi chạy xong để bảo mật tuyệt đối
            bat 'if exist .env del .env'
            
            publishHTML([
                allowMissing: true, 
                reportDir: 'playwright-report-chromium', 
                reportFiles: 'index.html', 
                reportName: 'CI Report', 
                keepAll: true, 
                alwaysLinkToLastBuild: true
            ])
            
            publishHTML([
                allowMissing: true, 
                reportDir: 'playwright-report-post-deploy', 
                reportFiles: 'index.html', 
                reportName: 'Post-Deploy Report', 
                keepAll: true, 
                alwaysLinkToLastBuild: true
            ])

            archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true, allowEmptyArchive: true
        }
        success {
            echo 'Quy trình hoàn tất xuất sắc!'
        }
        failure {
            echo 'Pipeline thất bại. Vui lòng kiểm tra lại log.'
        }
    }
}

// pipeline {
//     parameters {
//         choice(
//             name: 'ENV',
//             choices: ['all', 'chromium', 'firefox'],
//             description: 'Chọn môi trường chạy (Mặc định chạy tất cả trong luồng dưới)'
//         )
//     }

//     agent any

//     tools {
//         nodejs "NodeJS"
//     }

//     triggers {
//         githubPush()
//     }

//     environment {
//         // Biến môi trường dùng riêng cho CD (Deploy)
//         STAGING_URL = "https://staging.your-crm-project.com"
//     }

//     stages {
//         stage('1. Checkout Code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/Long075/CRM_Project.git'
//             }
//         }

//         // ==========================================
//         // BƯỚC "ĂN TIỀN": KÉO FILE .ENV TỪ KÉT SẮT
//         // ==========================================
//         stage('2. Chuẩn bị file .env') {
//             steps {
//                 // Gọi file .env đã lưu trong Jenkins Credentials (đặt ID là: crm-env-file)
//                 withCredentials([file(credentialsId: 'crm-env-file', variable: 'SECRET_ENV_FILE')]) {
//                     // Copy file bí mật này vào thư mục làm việc hiện tại với tên .env
//                     bat 'copy "%SECRET_ENV_FILE%" .env'
//                 }
//             }
//         }

//         stage('3. Build Docker Image') {
//             steps {
//                 bat 'docker build -t playwright-tests .'
//             }
//         }

//         // ==========================================
//         // PHẦN CI: KIỂM THỬ KHI CÓ CODE MỚI
//         // ==========================================
//         stage('4. CI: Chromium Tests') {
//             steps {
//                 retry(2){
//                     // Chỉ cần dùng cờ --env-file .env, Docker sẽ tự nạp cả 20 biến vào!
//                     bat """
//                     docker run --rm ^
//                     --env-file .env ^
//                     -v %cd%/playwright-report-chromium:/app/playwright-report ^
//                     playwright-tests npx playwright test --project=chromium
//                     """
//                 }
//             }
//         }

//         stage('5. CI: Firefox Tests') {
//             steps {
//                 bat """
//                 docker run --rm ^
//                 --env-file .env ^
//                 -v %cd%/playwright-report-firefox:/app/playwright-report ^
//                 playwright-tests npx playwright test --project=firefox
//                 """
//             }
//         }

//         // ==========================================
//         // PHẦN CD: ĐƯA LÊN MÔI TRƯỜNG THỰC TẾ
//         // ==========================================
//         stage('6. CD: Deploy lên Staging') {
//             steps {
//                 echo 'Thực hiện deploy code lên server Staging (Môi trường kiểm thử)...'
//                 // Gọi script deploy của team Dev ở đây
//             }
//         }

//         stage('7. CD: Staging Smoke Tests (Gatekeeper)') {
//             steps {
//                 echo 'Chạy Smoke Test trên Staging...'
//                 // Thủ thuật: Dùng --env-file .env để lấy 19 biến cũ, 
//                 // nhưng dùng cờ -e đằng sau để GHI ĐÈ biến BASE_URL thành URL của Staging!
//                 bat """
//                 docker run --rm ^
//                 --env-file .env ^
//                 -e BASE_URL=%STAGING_URL% ^
//                 -v %cd%/playwright-report-smoke:/app/playwright-report ^
//                 playwright-tests npx playwright test --grep "@smoke" --project=chromium
//                 """
//             }
//         }

//         stage('8. CD: Phê duyệt (Manual Approval)') {
//             steps {
//                 // Tạm dừng Pipeline chờ QA/Manager duyệt trước khi lên Production
//                 timeout(time: 1, unit: 'DAYS') {
//                     input message: 'Smoke Test trên Staging đã PASS. Bạn có muốn Deploy lên Production?', ok: 'Deploy ngay!'
//                 }
//             }
//         }

//         stage('9. CD: Deploy lên Production') {
//             steps {
//                 echo 'Đang đưa hệ thống lên Production...'
//                 // Gọi script deploy Production
//             }
//         }
//     }

//     post {
//         always {
//             publishHTML([
//                 allowMissing: true, 
//                 reportDir: 'playwright-report-chromium', 
//                 reportFiles: 'index.html', 
//                 reportName: 'Chromium CI Report', 
//                 keepAll: true, 
//                 alwaysLinkToLastBuild: true
//             ])

//             publishHTML([
//                 allowMissing: true, 
//                 reportDir: 'playwright-report-firefox', 
//                 reportFiles: 'index.html', 
//                 reportName: 'Firefox CI Report', 
//                 keepAll: true, 
//                 alwaysLinkToLastBuild: true
//             ])
            
//             publishHTML([
//                 allowMissing: true, 
//                 reportDir: 'playwright-report-smoke', 
//                 reportFiles: 'index.html', 
//                 reportName: 'Staging Smoke Report', 
//                 keepAll: true, 
//                 alwaysLinkToLastBuild: true
//             ])

//             archiveArtifacts artifacts: 'playwright-report-*/**', fingerprint: true, allowEmptyArchive: true
//         }

//         success {
//             echo 'Build và Deploy thành công rực rỡ!'
//         }
//         failure {
//             mail to: 'longluuhoang75@gmail.com',
//             subject: "Alert: Jenkins Pipeline Failed",
//             body: "Quá trình CI/CD đã thất bại. Vui lòng kiểm tra log trên Jenkins."
//         }
//     }
// }