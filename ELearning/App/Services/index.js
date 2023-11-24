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
                author
                banner {
                    url
                }
                chapters {
                    id
                }
            }
        }
    `

    const data = await request(MASTER_URL, query)
    return data?.courses || []
}