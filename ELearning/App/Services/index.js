import {
 request,
 gql
} from 'graphql-request'
const MASTER_URL = 'https://api-ap-northeast-1.hygraph.com/v2/clpcdvjo5a4ma01uib2rs1wl6/master'

export const getCourseList = async (level = 'Basic') => {
    const query = gql `
        query CourseList {
            courses(where: {level: ${level}}) {
                id
                name
                price
                level
                tags
                time
                description {
                    markdown
                    html
                }
                author
                banner {
                    url
                }
                chapters {
                    id
                    title
                    content {
                        heading
                        description {
                            markdown
                            html
                        }
                        output {
                            markdown
                            html
                        }
                    }
                }
            }
        }
    `

    const data = await request(MASTER_URL, query)
    return data?.courses || []
}

export const enrollCourse = async (courseId, userEmail) => {
    console.log(courseId, userEmail)
    const mutationQuery = gql`
        mutation EnrollCourse {
            createUserEnrolledCourse(
                data: { courseId: "${courseId}", userEmail: "${userEmail}", course: { connect: { id: "${courseId}"} } }
            ) {
                id
            }
            publishManyUserEnrolledCoursesConnection(to: PUBLISHED) {
                edges {
                    node {
                        id
                    }
                }
            }
        }
    `
    console.log(mutationQuery)
    const data = await request(MASTER_URL, mutationQuery)
    return data?.courses || []
}

export const getUserEnrolledCourses = async (courseId, userEmail) => {
  console.log(courseId, userEmail)
  const query = gql`
    query GetUserEnrolledCourses {
      userEnrolledCourses(where: { courseId: "${courseId}", userEmail: "${userEmail}" }) {
        id
        courseId
        completedChapters {
          chapterId
        }
      }
    }
  `
  console.log(query)
  const data = await request(MASTER_URL, query)
  return data?.userEnrolledCourses || []
}