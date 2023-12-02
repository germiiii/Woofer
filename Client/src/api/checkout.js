import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'

const clientId = 'AahLJYwOxpB8rxP5MCqopNDEgLYJFoaNOxwA0BmVEEzeJCj9yYml78eYMLTpAjVAjYS4svveNkYIXGeF'
const clientSecret = 'EOkdKdHrKXKUZVvjjKJMZGB37imq1nQhcfZZS70Ce8x5GWDnlGhv49g8tY17xj9xAr1_qt_-RSMiq38k'

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST() {
 
        const request = new paypal.orders.OrdersCreateRequest()

        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: '30.00',
                    },
                    items: [
                        {
                            name: '15 minute Premium dog walk',
                            description: 'Woofers will devote their full attention to walk your furry companion privately for 15 minutes.',
                            quantity: '1'
                        }
                    ]
                }
            ]
        })

        const response = await client.execute(request)
        console.log(response)

      return NextResponse.json({
        id: response.result.id
      })
    

   
}
