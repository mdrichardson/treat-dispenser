import { Component, OnInit } from '@angular/core';
import { DatabaseService, userInterface } from '../database.service';
import { PhotonService } from '../photon.service';
import { staggerItems } from '../animations/stagger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [staggerItems]
})

export class HomeComponent implements OnInit {

    public userLoggedIn:boolean = false;
    private userLoggedInSource;
    
    private user: userInterface;
    public video: string;
    public isDemo: boolean;

    public augerDisabled:boolean = false;

    constructor(private db: DatabaseService, private photon: PhotonService) {
        this.userLoggedInSource = this.db.userLoggedIn;
    }

    // Functions that correlate to Photon's treat and meal dispense functions.
    // this.augerDisabled disables the buttons that run the auger. They are re-enabled by the Photon service
    treat = () => {
        this.augerDisabled = true;
        this.photon.callFunction('auger', 'treat', 'Treat').subscribe(() => this.augerDisabled = false)
    };
    meal = () => {
        this.augerDisabled = true;
        this.photon.callFunction('auger', 'meal', 'Meal').subscribe(() => this.augerDisabled = false);
    }

    ngOnInit() {
        this.userLoggedInSource
            .subscribe(value => {
                if (value === true) {
                    this.user = this.db.getUser<userInterface>();
                    this.video = this.user.videoUrl + this.user.videoAuthToken;
                    this.isDemo = this.user.role == 'demo' ? true : false;
                }
            })
    }

}
