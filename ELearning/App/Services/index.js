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

export const markChapterAsCompleted = async (recordId, chapterId, userEmail, points) => {
    const mutationQuery = gql`
        mutation markChapterCompleted {
            updateUserEnrolledCourse(
                data: { completedChapters: { create: { data: { chapterId: "${chapterId}" }}}},
                where: {id: "${recordId}"}
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

            updateUserDetail(
                where: { email: "${userEmail}" },
                data: { point: ${points}}
            ) {
                point
            }

            publishUserDetail(where: { email: "${userEmail}" }) {
                id
            }
        }
    `

    console.log(mutationQuery)
    const data = await request(MASTER_URL, mutationQuery)
    return data
}

export const createNewUser = async (userName, email, profileImageUrl) => {
    const mutationQuery = gql`
        mutation CreateUser {
            upsertUserDetail(
                upsert: {
                    create: {
                        email: "${email}",
                        point: 10,
                        profileImage: "${profileImageUrl}",
                        userName: "${userName}"
                    },
                    update: {
                        email: "${email}",
                        profileImage: "${profileImageUrl}",
                        userName: "${userName}"
                    }
                }
                where: {email: "${email}"}
            ) {
                id
                point
            }
            publishUserDetail(where: {email: "${email}"}) {
                id
            }
        }
    `
    console.log(mutationQuery)
    const result = await request(MASTER_URL, mutationQuery)
    // result = {"publishUserDetail": {"id": "clpmczdaqbt230bzvdfmx1gao"}, "upsertUserDetail": {"id": "clpmczdaqbt230bzvdfmx1gao", "point": 10}}
    return result?.upsertUserDetail?.point
}

export const getUserDetail = async (email) => {
    const query = gql`
        query GetUserDetail {
            userDetail(where: {email: "${email}"}) {
                point
            }
        }
    `
    console.log(query)
    const result = await request(MASTER_URL, query)
    // result = {"userDetail": {"point": 10}}
    return result?.userDetail?.point
}

export const getAllUsers = async () => {
    const query = gql`
        query GetAllUsers {
            userDetails(orderBy: point_DESC) {
                id
                profileImage
                userName
                point
            }
        }      
    `
    console.log(query)
    const result = await request(MASTER_URL, query)
    // result = {"userDetails":[...]}
    return result?.userDetails
}