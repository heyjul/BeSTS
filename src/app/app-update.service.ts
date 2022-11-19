import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate,
    private dialog: MatDialog) {
    this.updates.versionUpdates.pipe(filter(x => x.type === "VERSION_READY")).subscribe(_ => {
      this.showAppUpdateAlert();
    });
  }
  showAppUpdateAlert() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '80%',
      data: 'Une nouvelle version est disponible, voulez-vous l\'utiliser ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.updates.activateUpdate().then(() => document.location.reload());
    });
  }
}