import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesComponent } from './components/services/services.component';
import { servicesRoutes } from './routes/services-routes';
import { MainServicesComponent } from './components/main-services/main-services.component';
import { ServicesAdvisorComponent } from './components/main-services/services-advisor/services-advisor.component';
import { ServicesSocialComponent } from './components/main-services/services-social/services-social.component';
import { ServicesTestComponent } from './components/main-services/services-test/services-test.component';
import { ChoseAdvisorComponent } from './components/chose-advisor/chose-advisor.component';
import { TypesOfConsultationsComponent } from './components/types-of-consultations/types-of-consultations.component';
import { TextConsultationComponent } from './components/text-consultation/text-consultation.component';
import { OnlineConsultationComponent } from './components/online-consultation/online-consultation.component';
import { BiographyComponent } from './components/biography/biography.component';
import { LocalCertificateComponent } from './components/local-certificate/local-certificate.component';
import { InternationalCertificateComponent } from './components/international-certificate/international-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { SubmitAdvisorComponent } from './components/submit-advisor/submit-advisor.component';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent,
    children: [
      {
        path: '',
        redirectTo: servicesRoutes.main,
        pathMatch: 'full',
      },
      {
        path: servicesRoutes.main,
        component: MainServicesComponent,
        children: [
          {
            path: '',
            redirectTo: servicesRoutes.servicesAdvisors,
            pathMatch: 'full',
          },
           {
            path: servicesRoutes.servicesAdvisors,
            component: ServicesAdvisorComponent,
          },
          {
            path: servicesRoutes.servicesSocial,
            component: ServicesSocialComponent,
          },
          {
            path: servicesRoutes.servicesTest,
            component: ServicesTestComponent,
          }
        ]
      },
      {
        path: servicesRoutes.chooseAdvisor,
       // component: ChoseAdvisorComponent,
       children:[
        {
        path:'',
        component: ChoseAdvisorComponent,
        },
        {
          path: servicesRoutes.TypesOfConsultations,
         // component: TypesOfConsultationsComponent,
         children:[
          {
            path:'',
            component: TypesOfConsultationsComponent,
          },
          {
            path: servicesRoutes.TextConsultation,
            component: TextConsultationComponent,
          },
          {
            path: servicesRoutes.OnlineConsultation,
            component: OnlineConsultationComponent,
          }
         ]
        }
       ]
      },
      {
        path: servicesRoutes.localcertificate,
       // component: LocalCertificateComponent,
         children:[
          {
            path: '',
            component: LocalCertificateComponent,
          },
           {
            path: servicesRoutes.certificateDetails,
            component: CertificateDetailsComponent,
          }
        ]
      },
      {
        path: servicesRoutes.internationalCertificate,
       // component: InternationalCertificateComponent,
        children:[
          {
            path: '',
            component: InternationalCertificateComponent,
          },
           {
            path: servicesRoutes.certificateDetails,
            component: CertificateDetailsComponent,
          }
        ]
      },
      // {
      //   path: servicesRoutes.certificateDetails,
      //   component: CertificateDetailsComponent,
      // },
      {
        path: servicesRoutes.advisor,
        //component: AdvisorComponent,
        children:[
          {
            path: '',
            component: AdvisorComponent,
          },
           {
            path: servicesRoutes.submitAdvisor,
            component: SubmitAdvisorComponent,
          }
        ]
      },
    ]
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
