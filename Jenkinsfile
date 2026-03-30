pipeline {
    agent any

    environment {
        REGISTRY = '192.168.122.101:5000'
        IMAGE = 'notes-app'
        DOCKER01 = '192.168.122.102'
        DB_HOST = '192.168.122.103'
        DB_PASSWORD = credentials('db-password')
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/David1704-1/notes-app.git'
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t ${REGISTRY}/${IMAGE}:${BUILD_NUMBER} -t ${REGISTRY}/${IMAGE}:latest ."
            }
        }

        stage('Push to Registry') {
            steps {
                sh "docker push ${REGISTRY}/${IMAGE}:${BUILD_NUMBER}"
                sh "docker push ${REGISTRY}/${IMAGE}:latest"
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['docker01-ssh']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no root@${DOCKER01} '
                            docker pull ${REGISTRY}/${IMAGE}:latest
                            docker stop notes-app || true
                            docker rm notes-app || true
                            docker run -d --name notes-app \
                                -p 3000:3000 \
                                -e DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@${DB_HOST}:5432/notes \
                                ${REGISTRY}/${IMAGE}:latest
                        '
                    """
                }
            }
        }
    }
}
