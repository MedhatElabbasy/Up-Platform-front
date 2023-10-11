import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { MainServicesComponent } from './components/main-services/main-services.component';
import { ServicesComponent } from './components/services/services.component';
import { ServicesAdvisorComponent } from './components/main-services/services-advisor/services-advisor.component';
import { ServicesSocialComponent } from './components/main-services/services-social/services-social.component';
import { ServicesTestComponent } from './components/main-services/services-test/services-test.component';
import { ChoseAdvisorComponent } from './components/chose-advisor/chose-advisor.component';
import { TypesOfConsultationsComponent } from './components/types-of-consultations/types-of-consultations.component';
import { TextConsultationComponent } from './components/text-consultation/text-consultation.component';
import { OnlineConsultationComponent } from './components/online-consultation/online-consultation.component';
import { CoreModule } from '../core/core.module';
import { BiographyComponent } from './components/biography/biography.component';
import { LocalCertificateComponent } from './components/local-certificate/local-certificate.component';
import { InternationalCertificateComponent } from './components/international-certificate/international-certificate.component';
import { CertificateDetailsComponent } from './components/certificate-details/certificate-details.component';
import { AdvisorComponent } from './components/advisor/advisor.component';
import { SubmitAdvisorComponent } from './components/submit-advisor/submit-advisor.component';


@NgModule({
  declarations: [
    MainServicesComponent,
    ServicesComponent,
    ServicesAdvisorComponent,
    ServicesSocialComponent,
    ServicesTestComponent,
    ChoseAdvisorComponent,
    TypesOfConsultationsComponent,
    TextConsultationComponent,
    OnlineConsultationComponent,
    BiographyComponent,
    LocalCertificateComponent,
    InternationalCertificateComponent,
    CertificateDetailsComponent,
    AdvisorComponent,
    SubmitAdvisorComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    CoreModule
  ]
})
export class ServicesModule { }